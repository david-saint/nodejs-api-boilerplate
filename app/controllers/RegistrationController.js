import Controller from './__init__/Controller';

class RegistrationController extends Controller {
  /**
   * The method that handles the registration ish
   * @param  {Request} req
   * @param  {Response} res
   * @return {JSON}
   */
  register(req, res) {
    // validate the request
    this.validate(req);
    console.log(req);
    return res.json({ data: { text: req.text } });
  }
}

export default RegistrationController;
