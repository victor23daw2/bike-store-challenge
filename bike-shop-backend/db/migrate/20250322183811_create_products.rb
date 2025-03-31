class CreateProducts < ActiveRecord::Migration[7.2]
  def change
    create_table :products do |t|
      t.string :name
      t.string :category
      t.decimal :price, precision: 8, scale: 2

      t.timestamps
    end
  end
end
