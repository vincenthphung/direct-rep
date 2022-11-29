import React from "react";

class LetterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: "",
      stance: "",
    };
    this.handleTopicChange = this.handleTopicChange.bind(this);
    this.handleStanceChange = this.handleStanceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTopicChange(event) {
    const value = event.target.value;
    this.setState({ topic: value });
  }

  handleStanceChange(event) {
    const value = event.target.value;
    this.setState({ stance: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };

    const url = "http://localhost:8090/api/letters";

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);

    if (response.ok) {
      await response.json();

      const cleared = {
        topic: "",
        stance: "",
        submitted: true,
      };

      this.setState(cleared);
    }
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new letter</h1>
            <form onSubmit={this.handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleTopicChange}
                  value={this.state.topic}
                  placeholder="Topic"
                  required
                  type="text"
                  name="topic"
                  id="topic"
                  className="form-control"
                />
                <label htmlFor="topic">Topic</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleStanceChange}
                  value={this.state.stance}
                  placeholder="Stance"
                  required
                  type="text"
                  name="stance"
                  id="stance"
                  className="form-control"
                />
                <label htmlFor="stance">Stance</label>
              </div>
              <button className="btn btn-outline-dark">Create</button>
            </form>
            {/* <div
              className={
                this.state.submitted
                  ? "alert alert-success mb-0 mt-3"
                  : "alert alert-success d-none mb-0"
              }
              id="success-message"
            >
              Letter has been created.
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}
export default LetterForm;
