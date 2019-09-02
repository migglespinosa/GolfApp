import React, {Component} from 'react';


function CreateButtons(props){
  const componentsList = Array.from(props.components)
  return(
    <div id="buttonsDisplay">
      {componentsList.map(component => (
        <button
          type="button"
          key={component}
          className={component.toString()}
          onClick={e => props.setComponent(component)}
        >
          {component}
        </button>
      ))}
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

    const components = ["Calculate", "FriendRequests", "Friends",
                      "HandicapProgress", "Map", "Score", "SetOutings",
                      "UpcomingOutings"];
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
