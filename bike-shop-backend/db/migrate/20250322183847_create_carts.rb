class CreateCarts < ActiveRecord::Migration[7.2]
  def change
    create_table :carts do |t|
      t.timestamps
    end
  end
end
