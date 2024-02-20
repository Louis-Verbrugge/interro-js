
const express = require('express');
const port = 5000;

const app = express();

app.listen(port, () => console.log(`Listening on port ${port}...`));

//import { createClient } from '@supabase/supabase-js'
const supabase = require('@supabase/supabase-js') // import the library

// Create a single supabase client for interacting with your database
const db = supabase.createClient('https://phlsxzirwsppyfygalmi.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBobHN4emlyd3NwcHlmeWdhbG1pIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNzIyNTM4MCwiZXhwIjoyMDIyODAxMzgwfQ.rGWwjHtP09VCKbI3B_c0ZUhJYN9iEMbe9HTo0c1oHe4')


// récupérer les valeurs de la table:
app.get('/commandes', async (req, res) => {
    const { data, error } = await db
        .from('commandes')
        .select();
    res.send(data);
});


//update
app.get("/update", async (req, res) => {
    const { data, error } = await db
        .from('produits')
        .update({ prix: 10 })
        .eq('id', 5)
    res.send("ok")
});


// ajouter une valeur dans la table:
app.post('/ajouteProduit', async (req, res) => {
    const { error } = await db
        .from('produits')
        .insert({ nom_produit: 'eau', prix: 5, quantite_en_stock: 1600 })
    res.send("ok")
});

//supprime une valeur de la table:
app.delete('/sup', async (req, res) => {
    const { data, error } = await db
        .from('produits')
        .delete()
        .eq('id', 5)
    res.send("fin");
});

