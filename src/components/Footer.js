import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <div>
      <footer>
        <div class="footer ">
          <div class="row ">
            <ul className="d-flex ml-6 justify-content-center ">
              <li className="m-2">
                <a href="#">Contact us</a>
              </li>
              <li className="m-2">
                <a href="#">Our Services</a>
              </li>
              <li className="m-2">
                <a href="#">Privacy Policy</a>
              </li>
              <li className="m-2">
                <a href="#">Terms & Conditions</a>
              </li>
              <li className="m-2">
                <a href="#">Career</a>
              </li>
            </ul>
          </div>

          <div class="row ml-6 justify-content-center">
            RecipeShare Copyright © 2024 RecipeShare - All rights reserved,
            Designed By: Preethi
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
