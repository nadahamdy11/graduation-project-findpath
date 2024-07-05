const { createRoot } = ReactDOM;

const {  Card  } = antd;
const App = () => (
  <Card
    title="Card title"
    bordered={false}
    style={{
      width: 300,
    }}
  >
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Card>
);
const ComponentDemo = App;


createRoot(mountNode).render(<ComponentDemo />);
export default App;

