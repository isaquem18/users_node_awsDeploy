import app from './app';

app.listen(3000, (err) => {
  if (err) {
    console.log('erro ❌');
  } else console.log('server started ✅');
});
