import Controller from './__init__/Controller';

class AnotherController extends Controller {
  /**
   * The method that handles the registration ish
   * @param  {Request} req
   * @param  {Response} res
   * @return {JSON}
   */
  register(req, res) {
    // validate the request
    console.log(this);
    this.validate(req);
    console.log(req);
    return res.json({ data: { text: req.text } });
  }
}

export default AnotherController;
