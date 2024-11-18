interface Strategy {
  login(user: string, password: string): boolean;
}

class LoginContext {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  login(user: string, password: string): boolean {
    return this.strategy.login(user, password);
  }
}

class LoginDBStrategy implements Strategy {
  login(user: string, password: string): boolean {
    console.log("Nos dirigimos a la base de datos");
    if (user === "admin" && password === "entra") {
      return true;
    }
    return false;
  }
}

class LoginServiceStrategy implements Strategy {
  login(user: string, password: string): boolean {
    console.log("Nos dirigimos a un servicio de autenticación");
    if (user === "admin" && password === "entra") {
      return true;
    }
    return false;
  }
}

class LoginGoogleStrategy implements Strategy {
  login(user: string, password: string): boolean {
    console.log("Nos dirigimos a Google para autenticar");
    if (user === "admin" && password === "entra") {
      return true;
    }
    return false;
  }
}

const auth = new LoginContext(new LoginDBStrategy());
auth.login("admin", "entra");
auth.setStrategy(new LoginServiceStrategy());
auth.login("admin", "entra");
auth.setStrategy(new LoginGoogleStrategy());
auth.login("admin", "entra");