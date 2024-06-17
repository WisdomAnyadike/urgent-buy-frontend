import React from 'react'
import "/src/Components/reviews/reviews.styles.scss"

const Reviews = () => {
    return (
        <>
            <h1 className='d-flex justify-content-center mb-4 reviewText'> Reviews </h1>
            <div className="contained w-100 mt-0">

                <div className="box" data-aos="flip-up">
                    <div className="imgBox rounded-circle">
                        <img src="https://www.skincare.com/-/media/project/loreal/brand-sites/sdc/americas/us/articles/2022/11-november/08-how-to-get-glowing-skin/_how-to-get-glowing-skin-tips-for-a-radiant-complexion-hero-sdc-110822.jpg?cx=0.49&cy=0.54&cw=705&ch=529&blr=False&hash=9F68F5B5CF7B753C7836EEEF7AA86C49" alt="" />

                    </div>
                    <div className="content d-flex flex-column align-items-center justify-content-end me-5">
                        <h4>love your products, always </h4>
                        <ul className="list-block small stars">
                            <li className="list-inline-item m-0"><i className="fa fa-star text-danger"></i></li>
                            <li className="list-inline-item m-0"><i className="fa fa-star text-danger"></i></li>
                            <li className="list-inline-item m-0"><i className="fa fa-star text-danger"></i></li>
                            <li className="list-inline-item m-0"><i className="fa fa-star text-danger"></i></li>
                            <li className="list-inline-item m-0"><i className="fa fa-star text-danger"></i></li>
                        </ul>
                    </div>
                </div>
                <div className="box" data-aos="flip-right">
                    <div className="imgBox">
                        <img src="https://beauty.thewom.it/content/uploads/sites/3/2021/05/skincare-uomo-pelle-grassa.jpg" alt="" />
                    </div>
                    <div className="content d-flex flex-column align-items-center justify-content-end me-5">
                        <h4> It works like magic, love!</h4>
                        <ul className="list-block small stars">
                            <li className="list-inline-item m-0"><i className="fa fa-star text-danger"></i></li>
                            <li className="list-inline-item m-0"><i className="fa fa-star text-danger"></i></li>
                            <li className="list-inline-item m-0"><i className="fa fa-star text-danger"></i></li>
                            <li className="list-inline-item m-0"><i className="fa fa-star text-danger"></i></li>
                            <li className="list-inline-item m-0"><i className="fa fa-star text-danger"></i></li>
                        </ul>
                    </div>
                </div>
                <div className="box" data-aos="flip-down">
                    <div className="imgBox">
                        <img src="https://media.allure.com/photos/5fdd2cfb4ec68910b62ab8e8/4:3/w_3048,h_2286,c_limit/skin-care-trends-2021-lede.jpg" alt="" />
                    </div>
                    <div className="content d-flex flex-column align-items-center justify-content-end me-5">
                        <h4> Fillers are so underated </h4>
                        <ul className="list-block small stars">
                            <li className="list-inline-item m-0"><i className="fa fa-star text-danger"></i></li>
                            <li className="list-inline-item m-0"><i className="fa fa-star text-danger"></i></li>
                            <li className="list-inline-item m-0"><i className="fa fa-star text-danger"></i></li>
                            <li className="list-inline-item m-0"><i className="fa fa-star text-danger"></i></li>
                            <li className="list-inline-item m-0"><i className="fa fa-star text-danger"></i></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reviews