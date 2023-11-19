const pdf_generator = ({title, waypoints = [], percent = 50}) => {
    return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,200;0,300;0,400;0,500;0,700;1,200;1,300&display=swap');

            * {
              font-family: 'Jost', sans-serif;
            }
            
            body {
              background-color:#ffffff;
              text-align: center;
              overflow-x: hidden;
            }
            
            body::-webkit-scrollbar {
              width: 0.75rem;          
            }
            
            body::-webkit-scrollbar-thumb {
                background-color: #0056B9; 
                border-radius: 0.25rem;      
                border: none;
            }
            
            h1, h2, h3, h4 {
              font-weight: 300;
              margin: 1rem 0rem;
            }

            .main {
              display: flex;
              position: relative;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              flex-wrap: wrap;
              color: #181C1F;
              font-size: 18px;
              width: 100%;
              z-index: 1;
            }

            .items {
              display: flex;
              position: relative;
              align-items: center;
              justify-content: space-around;
              flex-direction: row;
              flex-wrap: wrap;
              margin: 0.5rem 0rem;
              width: 100%;
            }
            
            .half {
              width: min(50%, 50rem);
            }
            
            .small {
              width: min(100%, 20rem);
            }
            
            .items:hover {
                cursor: pointer;
            }
            
            .item {
              display: flex;
              position: relative;
              justify-content: space-around;
              flex-wrap: wrap;
              align-items: center;
              text-align: center;
              flex-direction: column;
              border: none;
              user-select: none;
              cursor: pointer;
              width: 40%;
              margin: 0.5rem 0.25rem;
            }
            
            .card {
              font-size: 1.2rem;
              font-weight: 400;
              width: min(100%, 12rem);
              height: min(100%, 12rem);
              color: #181C1F;
              border: none;
              box-shadow: 0px 0px 3px 0px #181C1F;
              border-radius: 0.25rem;
              padding: 1.5rem 1rem;
              margin: 0.5rem 0.5rem;
            }            
          </style>
       </head>
            <body>        
                <div class="main">
                <h2>Title: ${title}</h2>
                <h3><b>${percent}%</b> agree</h3>
                    
                <h3>Waypoints</h3>
                  <div class="items half">
                      ${waypoints.map(el => `
                          <div class="item card">
                              <b>Title: ${el.title} (${el.rate})</b>
                              <p>${el.category}</p>
                          </div>
                      `)}
                  </div>
                </div>
            </body>
        </html>
    `
}

module.exports = pdf_generator