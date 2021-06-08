import React from 'react';
import './updateInfo.css';
import Dropzone from '../Dropzone/Dropzone';
import {TextField, OutlinedInput, Box} from '@material-ui/core';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {updateUserInfo} from '../actions/user.js';

const inputBoxTheme = createMuiTheme({
	overrides: {
		MuiOutlinedInput: {
			root: {
				borderRadius: '10px',
				Textcolor: 'black',
				Height: '48px',
				minWidth: '500px',
				textTransform: 'capitalize',
				marginLeft: '50px',
				marginBottom: '10px',
				'&$focused $notchedOutline': {
					borderColor: '#009688',
					borderWidth: '2px',
				},
				"&:hover $notchedOutline": {
					borderColor: '#71A89E'
				}
			},
			notchedOutline: {
				borderColor: '#71A89E'
			},
		},
	}
});
function UpdateInfo(User) {
    
    const [title, setTitle] = React.useState('');
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    
    const [subtitle, setSubtitle] = React.useState('');
    const handleSubtitleChange = (event) => {
        setSubtitle(event.target.value);
    };

    const [desc, setDesc] = React.useState('');
    const handleDescChange = (event) => {
        setDesc(event.target.value);
    }; 

    

    

    return (
        <div>
            
            {/* <NavExplore /> */}
            {/* <div className = 'postResume'>
                <Dropzone />
            </div> */}

            <div className='Subtitle_input'>
                <Box width={500}>
                    <TextField
                        id="subtitle-textarea"
                        name="new Date Of birth"
                        value={subtitle}
                        placeholder="new Date Of birth"
                        onChange={handleSubtitleChange}
                        variant="outlined"
                        fullWidth
                    />
                </Box>

            </div>
            <div className='Desc_input'>
                <Box width={500}>
                    <TextField
                        id="desc-textarea"
                        name="new program"
                        placeholder="new program"
                        onChange={handleDescChange}
                        value={desc}
                        multiline
                        variant="outlined"
                        fullWidth
                    />
                </Box>

            </div>
           


        </div>
    )
}

export default UpdateInfo
