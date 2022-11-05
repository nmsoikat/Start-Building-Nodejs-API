module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}

// any async function get called. then it will return a Promise