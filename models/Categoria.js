import conn from '../config/conn.js';
const Schema = conn.Schema;

const categoriaSchema = new Schema({
    nome: {
        type: String,
        required: true
    }, 
    slug: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Categoria = conn.model("Categoria", categoriaSchema);
export default Categoria;