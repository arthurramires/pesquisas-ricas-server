import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, key: path, location: url = '' } = req.file;

    const file = await File.create({
      name,
      path,
      url
    });

    return res.json(file);
  }
}

export default new FileController();
