const Contact = require('../models/contactModel')
exports.index = (req, res) => {
  res.render('contact', {contato:{}});
};

exports.register = async(req, res) => {
  try {
    const contact = new Contact(req.body)
    await contact.register()
    if(contact.errors.length > 0) {
      req.flash('errors', contact.errors)
      req.session.save(() => res.redirect('back'))
      return
    }
  
    req.flash('success', 'Contato registrado com sucesso')
    req.session.save(() => res.redirect(`/contato/index/${contact.contato._id}`))
    return
  } catch (error) {
    console.log(error)
    return res.render('404')
  }

}

exports.editIndex = async (req, res) => {
  if(!req.params.id) return res.render('404')
  const contact = 
  const contact = await Contact.buscaPorId(req.params.id)
  if(!contact) return res.render('404')
  res.render("contato", {
    contato:contact
  })

}