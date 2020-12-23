// class Add extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       checked: false,
//     };
//   }
//   handleCheck() {
//     let checked = !this.state.checked;
//     if (checked) {
//       this.props.count(true);
//     } else {
//       this.props.count(false);
//     }
//     this.setState({ checked });
//   }
//   render() {
//     return (
//       <div>
//         <label>
//           {this.props.name}
//           <input
//             type="checkbox"
//             checked={this.state.checked}
//             onChange={() => this.handleCheck()}
//           />
//         </label>
//       </div>
//     );
//   }
// }

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       count: 0,
//     };
//   }

//   count(checked) {
//     let { count } = this.state;
//     if (checked) {
//       count++;
//     } else {
//       count--;
//     }

//     console.log(count);
//     this.setState({ count });
//   }

//   render() {
//     const arr = ['Checkbox1', 'Checkbox2', 'Checkbox3'];
//     // Note: make sure to use bind on the count function since we are
//     // using the state from the parent component
//     return (
//       <div>
//         <form>
//           {arr.map((a) => (
//             <Checkbox name={a} count={this.count.bind(this)} />
//           ))}
//         </form>
//         {this.state.count}
//       </div>
//     );
//   }
// }
// export default Add
