export const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("e", e); // ###

    const formElement = document.getElementById("register-form");

    if (formElement) {
      // e.target
      const formData = new FormData(formElement as HTMLFormElement);

      const data = Object.fromEntries(formData);

      fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((json) => console.log("json response", json));
    }
  };

  return (
    <div className="bg-stone-600 h-full p-2">
      <h2 className="text-orange-500 w-fit mx-auto mt-20 mb-5">
        ¡Unete a nuestra red de profesionales!
      </h2>

      <form id="register-form" action="#" onSubmit={handleSubmit}>
        <div className="flex flex-col max-w-[600px] mx-auto">
          <div className="flex">
            <input
              type="text"
              placeholder="Nombre"
              name="firstName"
              required
            ></input>
            <input type="text" placeholder="Apellido" name="lastName"></input>
          </div>
          <input
            type="email"
            placeholder="Correo"
            name="email"
            required
          ></input>
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            required
          ></input>

          <button className="bg-orange-500 text-white" type="submit">
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};
