return (
  <div className="space-y-8">

    {/* 🔥 MAIN ORANGE HEADING */}
    <div>
      <h1 className="text-3xl font-bold text-orange-600">
        Products
      </h1>
      <p className="text-gray-500 mt-1">
        Manage your product inventory and pricing
      </p>
    </div>

    {/* PRODUCT INVENTORY */}
    <Card className="shadow-md border-0">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-orange-600 flex items-center gap-2">
          <Package className="h-5 w-5" />
          Product Inventory
        </CardTitle>
        <CardDescription>
          Supplier manages MRP & Selling Price
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Input
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>MRP (₹)</TableHead>
              <TableHead>Selling Price (₹)</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredProducts.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <Badge variant="outline">{p.category}</Badge>
                </TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>₹{p.mrp}</TableCell>
                <TableCell className="font-semibold text-green-600">
                  ₹{p.sellingPrice}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      setEditingProduct({
                        id: p.id,
                        category: p.category,
                        name: p.name,
                        mrp: String(p.mrp),
                        sellingPrice: String(p.sellingPrice),
                      })
                    }
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    {/* UPDATE PRODUCT PRICING */}
    <Card className="shadow-md border-0">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-orange-600">
          Update Product Pricing
        </CardTitle>
      </CardHeader>

      <CardContent className="grid md:grid-cols-5 gap-4">
        <Select
          value={form.category}
          onValueChange={(v) =>
            setForm({ ...form, category: v, productName: "" })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={form.productName}
          onValueChange={(v) => setForm({ ...form, productName: v })}
          disabled={!form.category}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Product" />
          </SelectTrigger>
          <SelectContent>
            {form.category &&
              productsByCategory[form.category].map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="MRP"
          value={form.mrp}
          onChange={(e) => setForm({ ...form, mrp: e.target.value })}
        />

        <Input
          type="number"
          placeholder="Selling Price"
          value={form.sellingPrice}
          onChange={(e) =>
            setForm({ ...form, sellingPrice: e.target.value })
          }
        />

        <Button
          onClick={handleUpdate}
          className="bg-orange-600 hover:bg-orange-700 text-white"
        >
          <Save className="h-4 w-4 mr-2" /> Update
        </Button>
      </CardContent>
    </Card>

  </div>
);
