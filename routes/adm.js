import e from "express";
const router = e.Router();
import Categoria from "../models/Categoria.js";

router.get('/', (req, res) => {
    res.render('adm/index');
});

router.get('/posts', (req, res) => {
    res.send("Página de posts");
});

router.get('/categorias', async (req, res) => {
    try {
        const categorias = await Categoria.find().lean();       
        res.render('adm/categorias', {categorias: categorias});
    } catch (error) {
        req.flash("error_msg", "Erro ao lista categorias");
        res.redirect('/adm');
    }
});

router.get('/categorias/add', (req, res) => {
    res.render('adm/addcategorias');
});

router.post('/categorias/nova', async (req, res) => {

    const erros = [];
    const content = {
        nome: req.body.nome,
        slug: req.body.slug
    };

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({texto: "Nome inválido"});
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({texto: "Slug inválido"});
    }

    if(erros.length > 0) {
        res.render('adm/addcategorias', {erros: erros});
    } else {
        try {
            await Categoria.create(content);
            req.flash("success_msg", "Categoria criada com sucesso");
            res.redirect('/adm/categorias');
        } catch (error) {
            req.flash("error_msg", "Erro ao cadastrar a categoria");
            res.redirect('/adm');
        }
    }

});

router.get('/categorias/edit/:id', async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id).lean();
        res.render('adm/editcategorias', {categoria: categoria});
    } catch (error) {
        req.flash("error_msg", "Categoria não encontrada");
        res.redirect('/adm/categorias');
    }
});

router.post('/categorias/edit', async (req, res) => {
    try {
        const categoria = await Categoria.findByIdAndUpdate(req.body.id, req.body).exec();
        req.flash("success_msg", "Categoria atualizada com sucesso");
        res.redirect('/adm/categorias/');
    } catch (error) {
        req.flash("error_msg", "Categoria não encontrada");
        res.redirect('/adm/categorias');
    }
});

router.post('/categorias/deletar', async (req, res) => {
    try {
        const categoria = await Categoria.findByIdAndDelete(req.body.id).exec();
        req.flash("success_msg", "Categoria removida com sucesso");
        res.redirect('/adm/categorias/');
        
    } catch (error) {
        req.flash("error_msg", "Categoria não encontrada");
        res.redirect('/adm/categorias');
    }
});

export default router;