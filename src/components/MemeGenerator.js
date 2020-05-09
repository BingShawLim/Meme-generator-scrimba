import React, { Component } from 'react'

export class MemeGenerator extends Component {
    constructor(){
        super()
        this.state={
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.randomizeImg = this.randomizeImg.bind(this)
    }

    componentDidMount(){
        fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json())
        .then(data => this.setState({allMemeImgs: data.data.memes}))
    }

    handleChange(e){
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    randomizeImg(e) {
        e.preventDefault()
        let number = Math.floor(Math.random() * Math.floor(this.state.allMemeImgs.length))
        this.setState({
            randomImage: this.state.allMemeImgs[number].url
        })
    }

    render() {
        return (
            <div>
                <form className="meme-form">
                    <input type="text"
                     name="topText"
                     placeholder="Top Text"
                      value={this.state.topText}
                      onChange={this.handleChange}
                      />

                    <input type="text"
                     name="bottomText"
                     placeholder="Bottom Text"
                       value={this.state.bottomText}
                       onChange={this.handleChange}
                       />
                    <button onClick={this.randomizeImg}>GEN</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImage} alt=""/>
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator
