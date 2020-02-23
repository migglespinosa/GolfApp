import React, {Component} from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

const buttonsDisplay = {
  //justifyContent: 'center'
  textAlign: 'center'
};

function CreateButtons(props){
  const componentsList = Array.from(props.components)
  return(
    <div className="d-flex justify-content-center">
      <ButtonGroup style={buttonsDisplay}>
          {componentsList.map(component => (
            <Button
              variant="primary"
              type="button"
              key={component}
              className={component.toString()}
              onClick={e => props.setComponent(component)}
            >
              {component}
            </Button>
          ))}
      </ButtonGroup>
    </div>
  );
}


class Buttons extends Component{
  constructor(props){
    super(props);
    this.state = {
      display: null
    };
    //this.changeDisplay = this.changeDisplay.bind(this);
  }

  render(){

    const components = ["Calculate", "Friends", "Map", "Score", "Outings", "Settings"];
    const setComponent = this.props.setComponent;
    return (
      <div>
        <CreateButtons
          components={components}
          setComponent={setComponent}
        />
      </div>
    );
  }
}

export default Buttons;
