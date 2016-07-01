import React, { PropTypes, Component } from 'react';
import {
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import { saveAnnote } from '../utils/annotation';
import FacebookLogout from './FacebookLogout';

import * as Actions from '../actions';

class AnnotatePanel extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { close, submit, del, annotation, actions } = this.props;
    const { exact } = annotation.target.selector;

    return (
      <div>
        <Button onClick={close}> Close </Button>
        <h1> Annotate Panel </h1>

        <form>
          <FormGroup controlId="annoteFormId">
            <FormControl
              type="text"
              value={exact}
            />
            <ControlLabel>Your Note</ControlLabel>
            <FormControl
              componentClass="textarea"
              value={annotation.body.text}
              onChange={(e) => actions.updateBody(e.target.value)}
            />
          </FormGroup>
        </form>
        <Button bsStyle="primary" onClick={submit}> Submit </Button>
        <div onClick={del}>delete</div>
        <FacebookLogout logout={actions.logout} />
      </div>
    );
  }
}

AnnotatePanel.propTypes = {
  user: PropTypes.object,
  actions: PropTypes.object,
  annotation: PropTypes.object,
  annotations: PropTypes.array,
  close: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
  // exact: PropTypes.string.isRequired,
};

export default AnnotatePanel;

