class AddImageUrlToProducts < ActiveRecord::Migration[7.2]
  def change
    add_column :products, :image_url, :string
  end
end
