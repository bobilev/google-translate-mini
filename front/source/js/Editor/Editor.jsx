import React from 'react'
import Paper from '@material-ui/core/Paper'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import ContentEditable from './ContentEditable.jsx'
import { FecthApiPOST, SourceLanguage, deepClonObject, isEmpty } from '../util.js'

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textOriginal: "<p><br></p>",
      textTranslate: "<p><br></p>",
      Original: "en",
      Translate: "ru"
    }
  }
  // upStoreDate = () => {
  //   console.log("upStoreDate")
  //   let mapParams = new Map()
  //   mapParams.set('storeid', this.state.StoreId)
  //   let res = fecthapi('step','getsteps',mapParams)
  //   res.then(res => {
  //     this.setState({Steps: res, OriginalSteps: deepClonObject(res)})
  //     //console.log("all steps",res)
  //   })
  // }

  onEditTextStep = (event) => {
    console.log('onEditTextStep', event.target.value)
    this.setState({
      textOriginal : event.target.value
    }, () => {
      this.onClickGoTranslate(event.target.value)
    })

  }
  handleChangeTextSelect = name => event => {
    console.log("handleChangeTextSelect",name,event.target.value)
    this.setState({[name]: event.target.value
    }, () => {
      this.onClickGoTranslate(this.state.textOriginal)
    })
  }
  onClickGoTranslate = (newText) => {
    let { Original, Translate } = this.state
    console.log('GoTranslate')
    let res = FecthApiPOST({Original: Original, Translate: Translate, Text: newText})
    res.then(res => {
      this.setState({textTranslate: res.Text, Original: res.LanguageDetect})
      console.log("res",res)
    })
  }
  componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
    console.log("componentDidUpdate",prevProps)
    if (this.state.Translate !== prevProps.Translate) {
      // this.fetchData(this.props.userID);
      console.log("componentDidUpdate изменился")
    }
    // console.log("componentDidUpdate не изменился")
  }
  render() {
    console.log('render')
    let { textOriginal, textTranslate, Original, Translate } = this.state
    let PlaceholderStyle = ( textOriginal === "<p><br></p>")? {display: 'block'}:{display: 'none'}
    let SelectLanguage = (dir,lang) => {
      return <FormControl id="SelectLanguage">
        <Select
        value={lang}
        displayEmpty
        onChange={this.handleChangeTextSelect(dir)}
        >
        {
          Object.keys(SourceLanguage).map(function(item) {
            // console.log(item,SourceLanguage[item])
            return (
              <MenuItem value={item}>{SourceLanguage[item]}</MenuItem>
            )
          })
        }

        </Select>
      </FormControl>

    }
    return (
      <div id='Editor'>
        <Paper className="paperEditor" elevation={8}>
          {SelectLanguage("Original",Original)}
          <ContentEditable html={textOriginal} onChange={this.onEditTextStep} />
          <p className="paperEditorPlaceholder" style={PlaceholderStyle}>Писать тут...</p>
        </Paper>
        <Paper className="paperEditor" elevation={8}>
          {SelectLanguage("Translate",Translate)}
          <span dangerouslySetInnerHTML={{__html: textTranslate}}>
          </span>
        </Paper>
      </div>
    );
  }
  componentDidMount() {
    // this.upStoreDate()
  }
}

export default Editor;
