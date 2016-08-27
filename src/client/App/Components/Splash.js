import React, { PropTypes } from 'react';
import { Well } from 'react-bootstrap';
import config from '../../../../config';

const baseUrl = process.env.NODE_ENV === 'production'
              ? config.url.host
              : `${config.url.host}:${config.url.port}`;

const Splash = ({ login }) => (
  <div id="splash" className="container">

    <div className="jumbotron">
      <h1 className="heading">Athena Annotation</h1>
      <p className="lead">Annotate the Web</p>
      <Well>
        The extension for creating and rendering annoations on web pages is not yet available to the public.
        <br></br>
        For now you can login / create an account with 1 click and see public annotations (go to 'Discover').
      </Well>
      <p>
        <a className="btn btn-lg facebook" href="#" role="button" onClick={login}>
          <i className="fa fa-facebook"></i>&nbsp;
          Login with Facebook
        </a>
        <a className="btn btn-lg github" href="https://github.com/AthenaAnnotate/AthenaAnnotate" role="button" >
          <i className="fa fa-github"></i>&nbsp;
          GitHub
        </a>
        <a target="_blank" className="btn btn-lg demo" href={`${baseUrl}/api/demo`} role="button" >
          <i className="fa fa-pencil"></i>&nbsp;
          Demo
        </a>
      </p>
    </div>

    <div className="row text-center">
      <h2 className="section-header">Highlight</h2>
      <p className="lead">Mark text with a highlight for quick reference.</p>
      <div className="col-lg-12">
        <img className="img-responsive" src={`${baseUrl}/athena-highlight.png`} alt="" />
      </div>
    </div>

    <div className="row text-center">
      <h2 className="section-header">Annotate</h2>
      <p className="lead">Create notes for important text passages.</p>
      <div className="col-lg-12">
        <img className="img-responsive" src={`${baseUrl}/athena-ui.png`} alt="" />
      </div>
    </div>

    <div className="row text-center">
      <h2 className="section-header">Dashboard</h2>
      <p className="lead">View your notes and revisit sites that you've annotated.</p>
      <div className="col-lg-12">
        <img src={`${baseUrl}/app-dashboard.png`} alt="" />
      </div>
    </div>
    {/*
    <footer className="footer text-center">
      <p>&copy; Made with <i className="fa fa-heart"></i> by Anonymous Anenome</p>
    </footer>
    */}

  </div>
);

Splash.propTypes = {
  login: PropTypes.func.isRequired,
};

export default Splash;
