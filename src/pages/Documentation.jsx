import React from "react";

const Documentation = () => {
  return (
    <div className="p-4 w-full xl:w-3/4">
      <h1 className="text-2xl font-bold">Documentation</h1>
      <p>
        For this project, I used .NET and React as per the requirements. The app
        is running on AWS and can be accessed{" "}
        <a
          href="http://ec2-18-195-118-235.eu-central-1.compute.amazonaws.com/"
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        .
      </p>

      <h2 className="text-xl font-semibold mt-6">Cloud Setup</h2>
      <p>
        I launched an EC2 t2.micro instance to run the frontend, backend, and
        SQL database. I installed Nginx for the web server and MySQL for the
        database. I also initialized tables on DynamoDB for the configurations.
      </p>

      <h2 className="text-xl font-semibold mt-6">Backend Setup</h2>
      <p>
        <a
          href="https://github.com/ahmetselimkaraca/PanteonAdminPanel/"
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click here
        </a>{" "}
        for the backend repository.
      </p>
      <p>
        The backend runs on .NET 8.0. For authentication, I used EF Core for the
        MySQL database and AspNetCore.Identity for user management. Installation
        details and more can be found on the Github repository page.
      </p>

      <h2 className="text-xl font-semibold mt-6">Frontend Setup & Usage</h2>
      <p>
        <a
          href="https://github.com/ahmetselimkaraca/panteon-demo-frontend"
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click here
        </a>{" "}
        for the frontend repository.
      </p>
      <p>
        I launched my React app with Vite and set up the endpoints for
        communicating with the API. I used TailwindCSS and NextUI for the
        design. NextUI had some theming bugs and theme switching does not work
        as they recommend in their documentation, so I created a ThemeProvider
        to fix the issues and add theme switching.
      </p>
      <p>
        Note that there are some mock components that are meant to be
        unfunctional and are there to simply suggest that they can be used for a
        more complex admin panel.
      </p>

      <h2 className="text-xl font-semibold mt-6">Navigation Logic</h2>
      <p>
        If the client has not logged in and the user enters the main page, they
        are redirected to the login page. If the user logs out, the token
        expires or the user is logged out for any other reason while on the main
        page, if they try to navigate or send requests they are again redirected
        to the login page. If the client is logged in and they try to access the
        login or register pages, they are redirected to the main page.
      </p>
      <p>
        The log in and sign-up pages use the same component. When the user
        navigates from the log in page to the sign-up page or vice versa, they
        are essentially switching the state of the component. Although they use
        the same component their routes are different.
      </p>

      <h2 className="text-xl font-semibold mt-6">Usage</h2>
      <p>
        When the user first enters the website, they are asked to log in. If
        they do not have an account they can register with a unique email
        address and a strong password. They are alerted for any input errors
        they make.
      </p>
      <p>
        After the user logs in, they are presented with the main page. On the
        main page, there is an empty table.
      </p>

      <h2 className="text-xl font-semibold mt-6">Configurations Table</h2>
      <p>
        There is a search box, a (non-functional) filter dropdown, and two
        buttons. The <strong>Add Configuration</strong> button prompts a modal
        that asks for the user to input the details of the configuration that
        they wish to create. After they enter the details, they are presented
        with a summary of the configuration, in which they see all of the
        details. The user can choose to confirm or go back to editing their
        details. After they confirm, the configuration appears on the table. The
        configuration has actions to view, edit or delete. In view and edit
        actions, a similar user experience is presented as in the creation
        action. The delete button asks the user to confirm deletion, after which
        the configuration is removed.
      </p>
      <ul className="list-disc list-inside">
        <li>
          If a configuration with a building type is already made, it does not
          appear in the selection box where the user picks building type.
        </li>
        <li>
          Pressing the headers of the table will sort it by ascending or
          descending on that field.
        </li>
        <li>The search button will search the table by building type.</li>
        <li>
          The <strong>Export Data</strong> button downloads the table in CSV
          format.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">Navbar</h2>
      <p>
        There is a search bar, a bell icon, a theme switcher, and an avatar.
        Search and notifications are not functional. The theme switcher switches
        the theme between light and dark modes. Clicking the avatar will show
        the option to log out.
      </p>

      <h2 className="text-xl font-semibold mt-6">Sidebar</h2>
      <p>
        The sidebar can be used to navigate the pages of the admin panel. The
        current page is highlighted.
      </p>
    </div>
  );
};

export default Documentation;
