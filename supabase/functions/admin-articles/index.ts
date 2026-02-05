import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check authorization
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const url = new URL(req.url);
    const method = req.method;

    // GET - List all articles or single article
    if (method === 'GET') {
      const articleId = url.searchParams.get('id');
      
      if (articleId) {
        const { data: article, error } = await supabase
          .from('articles')
          .select('*, article_documents(*)')
          .eq('id', articleId)
          .single();

        if (error) {
          return new Response(
            JSON.stringify({ error: 'Article not found' }),
            { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify(article),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { data: articles, error } = await supabase
        .from('articles')
        .select('*, article_documents(*)')
        .order('published_date', { ascending: false });

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify(articles),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // POST - Create new article
    if (method === 'POST') {
      const body = await req.json();
      const { title, slug, perex, content, published_date, is_featured, documents } = body;

      const { data: article, error } = await supabase
        .from('articles')
        .insert({
          title,
          slug,
          perex,
          content,
          published_date: published_date || new Date().toISOString().split('T')[0],
          is_featured: is_featured || false,
        })
        .select()
        .single();

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Add documents if provided
      if (documents && documents.length > 0) {
        const docsToInsert = documents.map((doc: { title: string; url: string }) => ({
          article_id: article.id,
          title: doc.title,
          url: doc.url,
        }));

        await supabase.from('article_documents').insert(docsToInsert);
      }

      return new Response(
        JSON.stringify(article),
        { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // PUT - Update article
    if (method === 'PUT') {
      const body = await req.json();
      const { id, title, slug, perex, content, published_date, is_featured, documents } = body;

      if (!id) {
        return new Response(
          JSON.stringify({ error: 'Article ID required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { data: article, error } = await supabase
        .from('articles')
        .update({
          title,
          slug,
          perex,
          content,
          published_date,
          is_featured,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Update documents - delete old and insert new
      await supabase.from('article_documents').delete().eq('article_id', id);
      
      if (documents && documents.length > 0) {
        const docsToInsert = documents.map((doc: { title: string; url: string }) => ({
          article_id: id,
          title: doc.title,
          url: doc.url,
        }));

        await supabase.from('article_documents').insert(docsToInsert);
      }

      return new Response(
        JSON.stringify(article),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // DELETE - Delete article
    if (method === 'DELETE') {
      const articleId = url.searchParams.get('id');

      if (!articleId) {
        return new Response(
          JSON.stringify({ error: 'Article ID required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', articleId);

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
