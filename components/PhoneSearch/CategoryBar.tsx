import React from 'react'

const CategoryBar = () => {
  const [active,ChangeActive] = React.useState([0,0,0]);
  return (
    <div className="category-bar">
            <ul className="faq-list">
              <li>
                <h4 className="faq-heading the-active"> Why choose digital marketing agencies in bangalore? </h4>
                            <p className="read faq-text">
                                Praesent scelerisque molestie mollis. Integer nec ullamcorper massa.
                            </p>
                        </li>
                        <li>
                            <h4 className="faq-heading"> Why choose digital marketing agencies in bangalore? </h4>
                            <p className="read faq-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi aliquam, felis quis
                            </p>
                        </li>
                        <li>
                        <h4 className="faq-heading"> Why choose digital marketing agencies in bangalore? </h4>
                        <p className="read faq-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi aliquam, felis quis
                                viverrerisque molestie mollis. Integer nec ullamcorper massa.
                      </p>
                  </li>
              </ul>
    </div>
  )
}

export default CategoryBar
