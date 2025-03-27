class CreateOptionCategories < ActiveRecord::Migration[7.2]
  def change
    create_table :option_categories do |t|
      t.string :name

      t.timestamps
    end
  end
end
