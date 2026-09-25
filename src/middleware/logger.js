const basicLogger = async (req, res, next) => {
  if (req.method === "GET" || req.method === "POST") {
    const dateNow = new Date();
    dateNow.setUTCMilliseconds(0);
    console.log(`[${dateNow.toISOString()}] Started ${req.method} ${req.path}`);
  }
  next();
};

export default basicLogger;
