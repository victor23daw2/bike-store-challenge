class CreateOptions < ActiveRecord::Migration[7.2]
  def change
    create_table :options do |t|
      t.string :name
      t.integer :stock
      t.decimal :extra_price, precision: 8, scale: 2
      t.references :option_category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
