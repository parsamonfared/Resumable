import React from 'react';
import './PostPage.css';
import Dropzone from '../Dropzone/Dropzone';
import {TextField, OutlinedInput, Box} from '@material-ui/core';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';


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
function PostPage() {
    
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

            <div className='Title_input'>     

                <OutlinedInput
                    id="outlined-name"
                    name="Title*"
                    value={title}
                    placeholder="Title"
                    onChange={handleTitleChange}
                    variant="outlined"
                    color="#71A89E"/>    
               

            </div>
            <div className='Subtitle_input'>
                <Box width={500}>
                    <TextField
                        id="subtitle-textarea"
                        name="Subtitle"
                        value={subtitle}
                        placeholder="Subtitle"
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
                        name="Description"
                        placeholder="Description"
                        onChange={handleDescChange}
                        value={desc}
                        multiline
                        variant="outlined"
                        fullWidth
                    />
                </Box>

            </div>
           <Dropzone />


        </div>
    )
}

export default PostPage
