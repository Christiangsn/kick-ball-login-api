import React from 'react';
import { createRoot } from 'react-dom/client';
import './reset-password.css';

function ResetPasswordForm() {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    // Verificar se está dentro de um iframe
    if (window.self === window.top) {
      document.body.innerHTML = '<p>Acesso não autorizado</p>';
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres');
      return;
    }

    try {
      // Pegar token da URL
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      const response = await fetch('/users/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        setSuccess(true);
        // Notificar o parent (se estiver em iframe)
        window.parent.postMessage(
          { type: 'password-reset-success' },
          window.location.origin
        );
      } else {
        setError('Erro ao redefinir senha. Tente novamente.');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor');
    }
  };

  if (success) {
    return (
      <div className="success-message">
        <h2>✓ Senha redefinida com sucesso!</h2>
        <p>Você já pode fechar esta janela.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Redefinir Senha</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password">Nova Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            placeholder="Mínimo 8 caracteres"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            placeholder="Digite a senha novamente"
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit">Redefinir Senha</button>
      </form>
    </div>
  );
}

// Renderizar o componente
const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<ResetPasswordForm />);
}