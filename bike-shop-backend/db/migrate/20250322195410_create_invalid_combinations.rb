class CreateInvalidCombinations < ActiveRecord::Migration[7.2]
  def change
    create_table :invalid_combinations do |t|
      t.references :option_1, null: false, foreign_key: { to_table: :options }
      t.references :option_2, null: false, foreign_key: { to_table: :options }
      t.string :reason

      t.timestamps
    end
  end
end
