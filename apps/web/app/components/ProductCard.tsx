import { BoxProps, forwardRefAs } from '@trms/ui'

type ProductCardProps = { index?: number } & BoxProps

export const ProductCard = forwardRefAs(({ index = 0, ...props }: ProductCardProps, ref) => {
  return (
    <div
      className="product-card product-grid__card  css-1xl2eyj"
      data-product-position={index}
      data-testid="product-card"
      ref={ref}
    >
      <div className="product-card__body" data-el-type="Card" data-testid="product-card__body">
        <figure>
          <a
            className="product-card__link-overlay opt-mobs-set"
            data-testid="product-card__link-overlay"
            href="https://www.nike.com/t/nikecourt-air-zoom-gp-turbo-osaka-womens-hard-court-tennis-shoes-GPx5CL/DX6956-100"
            tabIndex={-1}
          >
            NikeCourt Air Zoom GP Turbo Osaka
          </a>
          <a
            aria-label="NikeCourt Air Zoom GP Turbo Osaka"
            className="product-card__img-link-overlay"
            data-el-type="Hero"
            data-testid="product-card__img-link-overlay"
            href="https://www.nike.com/t/nikecourt-air-zoom-gp-turbo-osaka-womens-hard-court-tennis-shoes-GPx5CL/DX6956-100"
          >
            <div className="wall-image-loader  css-1la3v4n" data-testid="wall-image-loader">
              <img
                alt="NikeCourt Air Zoom GP Turbo Osaka Women's Hard Court Tennis Shoes"
                className="product-card__hero-image css-1fxh5tw"
                loading="eager"
                sizes=""
                src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/12554a94-9bd4-4305-9c2e-c6ba5da8e471/nikecourt-air-zoom-gp-turbo-osaka-womens-hard-court-tennis-shoes-GPx5CL.png"
              />
              <noscript>
                <img
                  alt="NikeCourt Air Zoom GP Turbo Osaka Women&#x27;s Hard Court Tennis Shoes"
                  className="product-card__hero-image css-1fxh5tw"
                  height="400"
                  loading="lazy"
                  width="400"
                />
              </noscript>
            </div>
          </a>
          <div className="product-card__info disable-animations for--product opt-inspected">
            <div className="product_msg_info">
              <div
                data-testid="product-card__messaging"
                className="product-card__messaging accent--color"
              >
                Just In
              </div>
              <div className="product-card__titles">
                <div
                  className="product-card__title"
                  id="NikeCourt Air Zoom GP Turbo Osaka"
                  role="link"
                >
                  NikeCourt Air Zoom GP Turbo Osaka
                </div>
                <div className="product-card__subtitle" role="link">
                  Women's Hard Court Tennis Shoes
                </div>
              </div>
            </div>
            <div
              className="product-card__count-wrapper show--all false"
              data-testid="product-card__count-wrapper "
            >
              <div className="product-card__count-item">
                <button
                  aria-expanded="false"
                  className="product-card__colorway-btn"
                  data-testid="product-card__colorway-btn"
                  type="button"
                >
                  <div
                    aria-label="Available in 1 Color"
                    className="product-card__product-count font-override__body1"
                  >
                    1 Color
                  </div>
                </button>
              </div>
            </div>
            <div className="product-card__animation_wrapper opt-inspected">
              <div className="product-card__price-wrapper">
                <div className="product-card__price" data-testid="product-card__price" role="link">
                  <div className="product-price__wrapper css-1q1feg0">
                    <div
                      className="product-price us__styling is--current-price css-11s12ax"
                      data-testid="product-price"
                      role="link"
                    >
                      $150
                    </div>
                  </div>
                  <div
                    className="opt-pim opt-pim-desktop"
                    style={{
                      color: 'rgb(0, 125, 72)',
                      fontWeight: 500,
                      paddingTop: '8px',
                      display: 'none',
                    }}
                  >
                    Extra 20% Off w/ SUMMER
                  </div>
                  <div
                    className="opt-pim opt-pim-mobile"
                    style={{
                      color: 'rgb(0, 125, 72)',
                      fontWeight: 500,
                      paddingTop: '8px',
                      display: 'none',
                    }}
                  >
                    Extra 20% Off w/ SUMMER
                  </div>
                </div>
              </div>
            </div>
          </div>
        </figure>
      </div>
    </div>
  )
})
