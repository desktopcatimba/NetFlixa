const conn = require('../service/bd')

async function getAll(req, res) {
 
    conn.query('SELECT * FROM user',(err,data)=>{
        if(err)
             res.status(500).json({ mensagem: 'Erro na busca', erro: err.message })
        res.json(data)
    })
   
  
}

async function getById (req,res)
{
    const id = req.params.id

   conn.query('SELECT * FROM user WHERE id = ?', [id], (err, data)=>{
        if(err)
            res.status(500).json({ mensagem: 'Erro na busca', erro: err.message })
        if (data.length === 0)
      return res.status(404).json({ mensagem: 'Usuário não encontrado' })
        res.json(data[0])
   })        
}

function create(req, res) {
  const { nome, email, sexo, idade } = req.body

  conn.query(
    'SELECT * FROM user WHERE nome = ? OR email = ?',
    [nome, email],
    (err, data) => {
      if (err) {
        return res.status(500).json({ mensagem: 'Erro na busca!', erro: err.message })
      }

      if (data.length > 0) {
        return res.status(400).json({ mensagem: 'Nome ou email já usados!' })
      }

      conn.query(
        'INSERT INTO user (nome, email, idade, sexo) VALUES (?, ?, ?, ?)',
        [nome, email, idade, sexo],
        (err) => {
          if (err) {
            return res.status(500).json({ mensagem: 'Erro ao criar', erro: err.message })
          }
          return res.status(201).json({ mensagem: 'Usuário criado com sucesso!' })
        }
      )
    }
  )

}

function Update(req, res) {
  const { nome, email, sexo, idade } = req.body
  const id = req.params.id

  conn.query(
    'update user set nome = ?, email = ?, sexo = ?, idade = ? WHERE id = ? ',
    [nome, email,sexo,idade,id],
    (err, data) => {
      if (err) {
        return res.status(500).json({ mensagem: 'Erro na atualização!', erro: err.message })
      }
      if (data.affectedRows === 0) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado!' })
      }
      return res.status(200).json({ mensagem: 'Usuário atualizado com sucesso!' })
    }
  )
}

function deletar(req, res) {
  const id = req.params.id

  conn.query(
    'delete from user WHERE id = ? ',
    [id],
    (err) => {
      if (err) {
        return res.status(500).json({ mensagem: 'Erro na exclusao!', erro: err.message })
      }
      return res.status(200).json({ mensagem: 'Usuário apagado com sucesso!' })
    }
  )
}




module.exports = { getAll, getById, create, Update, deletar }
