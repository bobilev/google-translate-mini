import React from 'react';

export default class ContentEditable extends React.Component {
  constructor(props) {
    super(props)
    this.textHTML = React.createRef()
  }
  shouldComponentUpdate(nextProps){
    return nextProps.html !== this.textHTML.current.innerHTML
  }
  componentDidUpdate() {
    if ( this.props.html !== this.textHTML.current.innerHTML ) {
        this.textHTML.current.innerHTML = this.props.html
    }
  }
  emitChange = () => {
    let html = this.textHTML.current.innerHTML
    if (html === "") {
      html = "<p><br></p>"
      this.textHTML.current.innerHTML = "<p><br></p>"
      // this.textHTML.current.blur()
    }
    if (this.props.onChange && html !== this.lastHtml) {
        this.props.onChange({
          target: { value: html }
        })
    }
    this.lastHtml = html
  }
  render() {
    return(
      <span ref={this.textHTML}
           onInput={this.emitChange}
           contentEditable
           suppressContentEditableWarning
           dangerouslySetInnerHTML={{__html: this.props.html}}
      >
      </span>
      )
  }
  componentDidMount() {
    document.execCommand("defaultParagraphSeparator", false, "p")
    if (this.textHTML.current.innerHTML === "<p><br></p>") {
      this.textHTML.current.focus()
    }

  }
}
