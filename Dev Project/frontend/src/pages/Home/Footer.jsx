const Footer = () => {
  return (
    <footer className="py-5 bg-dark text-light">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold">About Us</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consectetur elit sed nisi malesuada, eu aliquet odio mollis.
            </p>
          </div>
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold">Services</h2>
            <ul className="list-none">
              <li>Web Design</li>
              <li>Graphic Design</li>
              <li>Digital Marketing</li>
            </ul>
          </div>
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold">Contact</h2>
            <p>Email: info@example.com</p>
            <p>Phone: +1 123 456 7890</p>
          </div>
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold">Follow Us</h2>
            <div className="flex">
              <a href="#" className="text-light me-3">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-light me-3">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-light me-3">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <hr className="my-4 bg-light" />
        <p className="text-center text-gray-400">© 2023 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
