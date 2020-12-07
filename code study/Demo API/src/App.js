import React, { useState } from 'react'
import { getData, postData } from './BaseAPI'
import './App.css'

class LayoutPage extends React.PureComponent {
  constructor(props) {
    super(props)

    // Khai báo kiểu dữ liệu
    // Dùng this.setState để cập nhật dữ liệu
    // this.state.nameParams tên của biến của mình
    this.state = {
      arrData: []
    }
  }

  async componentDidMount() {
    const result = await getData('user')
    result && this.setState({ arrData: result })
  }

  onChangeValue = (e) => {
    this.setState({ name: e.target.value })
  }

  onChangeValueAge = (e) => {
    this.setState({ age: e.target.value })
  }

  onSubmit = async () => {
    const result = await postData({
      name: "User",
      schema: [
        { type: "String", key: "name" },
        { type: "Number", key: "age" },
        { type: "Object", key: "listData" },
        { type: "Object", key: "object" }
      ],
      data: {
        name: this.state.name,
        age: this.state.age,
        listData: [1, 2, 3, 4],
        object: { sample: "sample" }
      }
    })
  }

  render() {
    return (
      <div>
        <b>List of user data:</b>
        <div className="columnSpace">
          {this.state.arrData.map(item =>
            <div style={{ marginBottom: 15 }}>
              <div>{'Name: ' + item.name}</div>
              <div>{'Age: ' + item.age}</div>
            </div>
          )}
        </div>
        <b>Create new data</b>
        <div>
          Name: <input value={this.state.name} onChange={this.onChangeValue} />
          <div>
            Age: <input value={this.state.age} onChange={this.onChangeValueAge} />
          </div>
          <button onClick={this.onSubmit}>Create</button>
        </div>
      </div>
    )
  }
}
export default LayoutPage
