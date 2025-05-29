// src/component/HotProductSection/HotProductSection.jsx
export default function HotProductSection() {
  const products = [
    {
      name: "Sữa Primavita 2 400g (Dành cho bé từ 6 -12 tháng )",
      code: "Primavita004",
      price: "390.000 VND",
      image: "src/assets/img/product/product1.png",
    },
    {
      name: "Sữa Primavita 2 400g (Dành cho bé từ 6 -12 tháng )",
      code: "Primavita004",
      price: "390.000 VND",
      image: "src/assets/img/product/product1.png",
    },
    {
      name: "Sữa Primavita 2 400g (Dành cho bé từ 6 -12 tháng )",
      code: "Primavita004",
      price: "390.000 VND",
      image: "src/assets/img/product/product1.png",
    },
  ];

  return (
    <div style={{ padding: "40px 0", textAlign: "center" }}>
      <h2
        style={{
          backgroundColor: "#b8e4f6",
          display: "inline-block",
          padding: "20px 40px",
          borderRadius: "10px",
          fontWeight: "bold",
          fontSize: "28px",
        }}
      >
        SẢN PHẨM HÓT
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        {products.map((product, index) => (
          <div key={index} style={{ width: "250px", textAlign: "left" }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "auto" }}
            />
            <p style={{ margin: "10px 0 5px" }}>{product.name}</p>
            <p style={{ color: "#888", margin: "0 0 5px" }}>
              Mã sản phẩm:{" "}
              <span style={{ color: "#0056b3" }}>{product.code}</span>
            </p>
            <p style={{ fontWeight: "bold" }}>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
