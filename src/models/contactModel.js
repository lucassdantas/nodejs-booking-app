const mongoose = require('mongoose');
const validator = require('validator')
const ContactSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: false, default:'' },
  sobrenome: { type: String, required: false, default:'' },
  telefone: { type: String, required: false, default:'' },
  criadoEm: { type: Date, default: Date.now() }
});

const ContactModel = mongoose.model('Contact', ContactSchema);
Contact.buscaPorId = async(id) => {
  if(typeof id !== "string") return
  const user = await ContactModel.findById(id)
  return user
}
class Contact {
  constructor(body){
    this.body = body;
    this.errors = []
    this.contato = null
  }


  async register(){
    this.valida()
    
    if(this.errors.length > 0 ) return
    this.contato = await ContactModel.create(this.body)
  }
  valida(){
    this.cleanUp()
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido')
    if(!this.body.nome) this.errors.push('O nome é obrigatório')
    if(!this.body.email && !this.body.telefone) this.errors.push('É necessário preencher e-mail ou telefone')
  }
  
  cleanUp() {
    for(const key in this.body){
      if( typeof this.body[key] != 'string' || typeof this.body[key] == undefined){
        this.body[key] = ''
      }
    }
  
    this.body = {
      email: this.body.email,
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      telefone: this.body.telefone
    }
  }
}





module.exports = Contact;
