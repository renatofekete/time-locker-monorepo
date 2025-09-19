type LoginFormProps = {
  handleSubmit: (e: React.FormEvent) => void;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  email: string;
  password: string;
};

const LoginForm = ({
  handleSubmit,
  handleChange,
  email,
  password,
}: LoginFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="flex flex-col gap-2.5 mb-8">
        <div>
          <input
            className="text-sm bg-slate-100 py-4.5 px-4 w-full rounded-xl"
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={handleChange}
            placeholder="Email address"
          />
        </div>
        <div>
          <input
            className="text-sm bg-slate-100 py-4.5 px-4 w-full rounded-xl"
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
      </div>
      <button
        className="w-full bg-neutral-900 text-white py-4 font-medium rounded-xl"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};
export default LoginForm;
