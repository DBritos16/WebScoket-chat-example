
export const Login = () => {


    const login = () => {

    };
    

    return (
        <section className="container">
            <div className='login'>
                <form onSubmit={login}>
                    <div class="mb-3">
                        <label htmlFor="login" class="form-label">Username</label>
                        <input type="text" class="form-control" id="login" />
                    </div>
                    <button type='submit' className='btn btn-primary'>
                        Ingresar
                    </button>
                </form>
            </div>
        </section>
    )
}
