import React from 'react'
import "/src/Components/reviews/reviews.styles.scss"

const Reviews = () => {
    return (
        <>
            <h1 className='d-flex justify-content-center mb-4 reviewText'> Reviews </h1>
            <div className="contained w-100 mt-0">

                <div className="box" data-aos="flip-up">
                    <div className="imgBox">
                        <img src="https://img.freepik.com/free-photo/portrait-handsome-young-man-makes-okay-gesture-demonstrates-agreement-likes-idea-smiles-happily-wears-optical-glasses-yellow-hat-t-shirt-models-indoor-its-fine-thank-you-hand-sign_273609-30676.jpg?size=626&ext=jpg" alt="" />

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
                        <img src="https://image.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg" alt="" />
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
                        <img src="https://image.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg" alt="" />
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