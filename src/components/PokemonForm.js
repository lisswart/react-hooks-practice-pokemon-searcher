import { useState } from "react";
import { Form } from "semantic-ui-react";

function PokemonForm({ onAddPokemon }) {
  const [formData, setFormData] = useState({
    name: "",
    hp: "",
    frontUrl: "",
    backUrl: ""
  })

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event) {
    // Semantic UI React's Form component handles the preventDefault automatically!
    const newPokemon = {
      name: formData.name,
      hp: formData.hp,
      sprites: {
        front: formData.frontUrl,
        back: formData.backUrl
      }
    };
    fetch("http://localhost:3001/pokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPokemon)
    })
      .then(r => r.json())
      .then(onAddPokemon);
  };

  return (
    <div style={{marginBottom: "13px"}}>
      <h3>Add a Pokemon!</h3>
      <Form 
        onSubmit={handleSubmit}
      >
        <Form.Group widths="equal" style={{display: "flex", justifyContent: "center", justifyContent: "space-evenly"}}>
          <div>
            <label fluid style={{color: "lavenderblush"}}>Name</label>
            <Form.Input placeholder="Name" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label fluid style={{color: "lavenderblush"}}>hp</label>
            <Form.Input placeholder="hp" name="hp" value={formData.hp} onChange={handleChange} />
          </div>
          <div>
            <label fluid style={{color: "lavenderblush"}}>Front Image URL</label>
            <Form.Input placeholder="url" name="frontUrl" value={formData.frontUrl} onChange={handleChange} />
          </div>
          <div style={{marginBottom: "18px"}}>
            <label fluid style={{color: "lavenderblush"}}>Back Image URL</label>
            <Form.Input placeholder="url" name="backUrl" value={formData.backUrl} onChange={handleChange} />            
          </div>                
        </Form.Group>
        <Form.Button>Submit</Form.Button> 
      </Form>
    </div>
  );
}

export default PokemonForm;