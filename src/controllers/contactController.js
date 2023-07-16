const Contact = require('../models/contactModel')
exports.index = (req, res) => {
  res.render('contact');
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
    req.session.save(() => res.redirect('back'))
    return
  } catch (error) {
    console.log(error)
    return res.render('404')
  }

}