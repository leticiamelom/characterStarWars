const connection = require('../database/connection');

module.exports = {
  async index(request, response) {  
    const { page = 1 } = request.query;

    const [count] = await connection('characters').count();

    console.log(count);

    const characters = await connection('characters')
      .join('ongs', 'ongs.id', '=', 'characters.ong_id')
      .limit(5)
      .offset((page - 1) * 5)  
      .select([
        'characters.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(characters);
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection('characters').insert({
      title,
      description,
      ong_id
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const character = await connection('characters')
      .where('id', id)
      .select('ong_id')
      .first();

    if (character.ong_id != ong_id) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection('characters').where('id', id).delete();

    return response.status(204).send();
  }
};