import React from 'react'
import Paper from '@material-ui/core/Paper'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import SwapIcon from '@material-ui/icons/SwapHoriz'
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
  onEditTextStep = (event) => {
    this.setState({
      textOriginal : event.target.value
    }, () => {
      this.onClickGoTranslate()
    })

  }
  handleChangeTextSelect = name => event => {
    this.setState({[name]: event.target.value
    }, () => {
      this.onClickGoTranslate()
    })
  }
  onClickGoTranslate = () => {
    let { textOriginal ,Original, Translate } = this.state
    let res = FecthApiPOST({Original: Original, Translate: Translate, Text: textOriginal})
    res.then(res => {
      this.setState({textTranslate: res.Text, Original: res.LanguageDetect})
    })
  }
  onClickSwap = () => {
    let { Original, Translate, textOriginal, textTranslate } = this.state
    this.setState({
      Original: Translate,
      Translate: Original,
      textOriginal: textTranslate,
      textTranslate: textOriginal
    })
  }
  render() {
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
        <Paper className="paperEditor1" elevation={8}>
          {SelectLanguage("Original",Original)}
          <ContentEditable html={textOriginal} onChange={this.onEditTextStep} />
          <p className="paperEditorPlaceholder" style={PlaceholderStyle}>Писать тут...</p>
        </Paper>
        <Button
          id="btnSwap"
          onClick={this.onClickSwap}
        >
          <SwapIcon />
        </Button>
        <Paper className="paperEditor2" elevation={8}>
          {SelectLanguage("Translate",Translate)}
          <Button
            id="btnTranslate"
            size="small"
            variant="outlined"
            color="primary"
            onClick={this.onClickGoTranslate}
          >
            Перевести
          </Button>
          <span dangerouslySetInnerHTML={{__html: textTranslate}}>
          </span>
        </Paper>
      </div>
    );
  }
}

export default Editor;
