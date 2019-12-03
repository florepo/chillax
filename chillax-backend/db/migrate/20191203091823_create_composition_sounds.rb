class CreateCompositionSounds < ActiveRecord::Migration[6.0]
  def change
    create_table :composition_sounds do |t|
      t.float :volume
      t.references :sound, null: false, foreign_key: true
      t.references :composition, null: false, foreign_key: true

      t.timestamps
    end
  end
end
