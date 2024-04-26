import React from 'react'
import './ImageSlider.css'
import { Carousel } from 'react-bootstrap'

function ImageSlider() {
    return (
        <div className='slider'>
            <Carousel>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src="https://www.itl.cat/pngfile/big/149-1491781_back-to-53-book-wallpapers-hd-law-book.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100"
                        src="https://c1.wallpaperflare.com/preview/314/735/593/book-read-book-pages-literature.jpg"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                      
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://wallpapercave.com/wp/wp2036002.jpg"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                       
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default ImageSlider
